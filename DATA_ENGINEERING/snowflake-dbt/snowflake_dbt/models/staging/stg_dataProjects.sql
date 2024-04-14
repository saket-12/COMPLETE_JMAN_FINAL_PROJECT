{{
    config(
        tags=['projects', 'staging']
    )
}}

WITH

required_fields AS (

    SELECT
    
        CAST(UserId AS varchar) AS ID,
        CAST(PROJECTNAME AS varchar) AS PROJECT,
        CAST(TOTALHOURSWORKED AS NUMBER) AS HOURS_WORKED,
        CAST(TECHUSED AS varchar) AS TECH_USED,
        CAST(PERFORMANCE AS varchar) AS PERFORMANCE,
         CAST(DOMAIN AS varchar) AS DOMAIN

    FROM {{ source('jman', 'DATAPROJECTS') }}

)

SELECT * FROM required_fields