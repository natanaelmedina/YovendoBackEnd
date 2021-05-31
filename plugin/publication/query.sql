
--showOnly
select
    count(id) cnt,
    jsonb_build_object(
                'Envio gratis',jsonb_build_object('cnt',sum(case when "freeShipping" then 1 else 0 end),'name','free' ),
                'Con garantia',jsonb_build_object('cnt',sum(case when "guarantee" is not null then 1 else 0 end),'name','guarantee' ),
                'Tiendas',jsonb_build_object('cnt',sum(case when "isStore" then 1 else 0 end),'name','store' )
                ) as show,
    jsonb_build_object( 
                    'Nuevo',jsonb_build_object('cnt',sum(case when "conditionId" = 1 then 1 else 0 end),'id',1 ),
                    'Usado',jsonb_build_object('cnt',sum(case when "conditionId" = 2 then 1 else 0 end),'id',2),
                    'Para partes',jsonb_build_object('cnt',sum(case when "conditionId" = 3 then 1 else 0 end),'id',3)
                    )condition
from publication --{where}
--end showOnly

--$$$

--LOCATION COUNT
select 
   a.id,
   a.name,
   count(a.id) cnt
from location a
inner join publication  on a."id" = publication."locationId"
--{where}
group by a."id"
--END LOCATION COUNT


--$$$

---features counter
SELECT 
   jsonb_build_object(
	   key,jsonb_object_agg(value,qty ORDER BY qty)
   ) as features
FROM (
        select 
	     b.key,
		 b.value::jsonb->>'value' as value,
	     count(b.value::jsonb->>'value') qty,
	     max(b.value::jsonb->>'filtrable') filterable
		from publication 
	    INNER join jsonb_each_text(publication."features") b ON true and publication."features" is not null
        --{where}
		group by b.key,b.value,b.value::jsonb->>'value'
	    having b.key is not null and b.value is not null and b.value::jsonb->>'filtrable'='true'
 ) as features
GROUP BY key
ORDER BY key


--$$$

--categories counter
select 
 a.name,
 a.id,
count(a.id) cnt
from category  a
inner join publication on publication."categoryId"=a.id
--{where}
group by a.id