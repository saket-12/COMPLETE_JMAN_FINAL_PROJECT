{{
    config(
        tags=['marts','frequency']
    )
}}

WITH

stg_certificate AS (

    SELECT

        *

    FROM {{ ref('stg_dataCertificates') }}
),

result as (

    select 
    certificate,
    count(*) as Number_held
    from stg_certificate
    group by certificate
    order by Number_held desc
    limit 10

)

select * from result