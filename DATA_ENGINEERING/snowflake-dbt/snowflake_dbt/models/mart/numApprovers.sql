{{
    config(
        tags=['marts','approver']
    )
}}


WITH

stg_user AS (

    SELECT

        *

    FROM {{ ref('stg_dataUsers') }}
    
),


result as (

    select
    
    isApprover,
    count(*) as number_of_employees
    from stg_user
    group by isApprover

)

select * from result