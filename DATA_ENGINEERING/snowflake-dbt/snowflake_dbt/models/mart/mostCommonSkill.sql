{{
    config(
        tags=['marts','skill']
    )
}}


WITH

stg_user AS (

    SELECT

        *

    FROM {{ ref('stg_dataUsers') }}
    
),

stg_skill AS (

    SELECT

        *

    FROM {{ ref('stg_dataSkills') }}
    

),

result as (

    SELECT
    stg_user.ID as USERID,
    stg_user.name,
    stg_user.role,
    stg_user.isApprover,
    stg_skill.skill,
    stg_skill.proficiency
    from 
        stg_user 
    join 
        stg_skill on stg_user.ID = stg_skill.ID
),

skillKpi as (
    select 
    skill,
    count(skill) as count_skill
    from result
    group by skill
    order by count_skill desc
)

select * from skillKpi











