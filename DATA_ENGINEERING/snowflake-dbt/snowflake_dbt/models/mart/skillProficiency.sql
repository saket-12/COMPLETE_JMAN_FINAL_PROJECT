{{
    config(
        tags=['marts','prof']
    )
}}

WITH

stg_skill AS (

    SELECT

        *

    FROM {{ ref('stg_dataSkills') }}
    

),

result as (

    select
    
    skill,
    proficiency,
    count(*) as Frequnecy
    from stg_skill
    group by skill , proficiency
    order by skill asc, proficiency asc
)

select * from result