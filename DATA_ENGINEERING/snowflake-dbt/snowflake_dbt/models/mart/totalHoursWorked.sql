{{
    config(
        tags=['marts','hours']
    )
}}


WITH

stg_user AS (

    SELECT

        *

    FROM {{ ref('stg_dataUsers') }}
    
),

stg_project AS (

    SELECT

        *

    FROM {{ ref('stg_dataProjects') }}
),

totalHoursWorked AS (
    select
    stg_user.name as Emp_name,
    stg_user.role as Emp_role,
    sum(stg_project.hours_worked) as total_hours_on_project
    from stg_user join stg_project
    on stg_user.ID = stg_project.ID
    group by Emp_name , Emp_role
    order by total_hours_on_project desc

),


role_total AS (
    select Emp_role, max(total_hours_on_project) as maxHrs
    from totalHoursWorked
    group by Emp_role
),

final AS (
    select th.Emp_name, rt.Emp_role, th.total_hours_on_project 
    from role_total rt, totalHoursWorked th
    where th.Emp_role = rt.Emp_role and rt.maxHrs = th.total_hours_on_project
),



select * from final





