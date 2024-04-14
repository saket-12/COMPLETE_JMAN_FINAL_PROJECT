{{
    config(
        tags=['marts','domain']
    )
}}

WITH

stg_project AS (

    SELECT

        *

    FROM {{ ref('stg_dataProjects') }}
),

domainWiseProject AS (
    select 
    domain,
    sum(hours_worked) as total_hours ,
    count(project) as Number_of_projects
    from stg_project
    group by domain
)

select * from domainWiseProject