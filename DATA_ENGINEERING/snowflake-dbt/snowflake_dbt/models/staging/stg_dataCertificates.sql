{{
    config(
        tags=['certificates', 'staging']
    )
}}

WITH

required_fields AS (

    SELECT
    
        CAST(UserId AS varchar) AS ID,
        CAST(CERTIFICATENAME AS varchar) AS CERTIFICATE,
        CAST(ORGANIZATION AS varchar) AS ORGANIZATION,


    FROM {{ source('jman', 'DATACERTIFICATES') }}

)

SELECT * FROM required_fields