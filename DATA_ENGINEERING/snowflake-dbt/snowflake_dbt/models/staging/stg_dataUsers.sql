{{
    config(
        tags=['users', 'staging']
    )
}}

WITH

required_fields AS (

    SELECT
    
        CAST(_id AS varchar) AS ID,
        CAST(name AS varchar) AS NAME,
        CAST(role AS varchar) AS ROLE,
        CAST(isApprover AS varchar) AS isApprover,

    FROM {{ source('jman', 'DATAUSERS') }}

)

SELECT * FROM required_fields

