{{
    config(
        tags=['marts','org']
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
    organization,
    count(certificate) as Number_of_certificates
    from stg_certificate
    group by organization
    order by Number_of_certificates desc
    limit 1

)

select * from result



