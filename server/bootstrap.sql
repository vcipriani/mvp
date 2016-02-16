
--File for development only to help generate data in db
insert into interaction_types (type, description) 
values ('A/B Testing', 'Test two different HTML sections and compare click rates.');

insert into pages  (title, customer, views)
values ('Main page', 1, 0 );

-- insert into rel_page_interaction (interaction_id, page_id, target_selector)
-- values (2, 1, '#target1');

-- insert into rel_page_interaction (interaction_id, page_id, target_selector)
-- values (1, 1, '#target1');

insert into interactions (title, description, interaction_type_id, visits)
values ('SlapWeight', '$19.95 campaign testing Slapchop vs. Shakeweight', 1, 0);

insert into ab_testing_iterations (interaction_id, iteration_id, iteration_description, html_content, hits )
values (1, 0, 'Shakeweight for $19.95', '<img src="http://secure.cyberbrands.com/as-seen-on-tv/im/shakeweight_med.jpg" height=200>', 0) ,
(1, 1, 'Slapchop for $19.95', '<img src="http://www.ultimatecoupons.com/blog/wp-content/uploads/2014/04/slap-chop.jpg" height=200>', 0);

insert into interactions (title, description, interaction_type_id, visits)
values ('Test Offer Efficacy #2', 'Offer different value propositions to see what customers respond to #2', 1, 0);

insert into ab_testing_iterations (interaction_id, iteration_id, iteration_description, html_content, hits )
values (2, 0, 'Offer an OK deal', '<div><h1> Click here for a free hotdog!</h1></div>', 0) ,
(2, 1, 'Make them a marginally better deal', '<div><h1> Click here for a free hotdog and drink!</h1></div>', 0);



