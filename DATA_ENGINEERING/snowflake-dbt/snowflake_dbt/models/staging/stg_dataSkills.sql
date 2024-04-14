{{
    config(
        tags=['skills', 'staging']
    )
}}

WITH

required_fields AS (

    SELECT
    
        CAST(UserId AS varchar) AS ID,
        CAST(skillName AS varchar) AS SKILL,
        CAST(proficiency AS varchar) AS PROFICIENCY,

    FROM {{ source('jman', 'DATASKILLS') }}

)

SELECT * FROM required_fields
