
--File for development only to help generate data in db
insert into interaction_types (type, description) 
values ('A/B Testing', 'Test two different HTML sections and compare click rates.');

insert into pages  (title, customer)
values ('Main page', 1);

insert into interactions (title, description, interaction_type_id, visits)
values ('Test Offer Efficacy', 'Offer different value propositions to see what customers respond to', 1, 0);

insert into rel_page_interaction (interaction_id, page_id, target_selector)
values (1, 1, '#target1');

insert into ab_testing_iterations (interaction_id, iteration_id, iteration_description, html_content, hits )
values (1, 0, 'Offer absolutely nothing to the user', '<div><h1> Click here for a swift kick in the pants!</h1></div>', 0) ,
(1, 1, 'Make them an offer they can\'t refuse', '<div><h1> Click here for a free puppy!</h1></div>', 0);

insert into ab_testing_iterations (interaction_id, iteration_id, iteration_description, html_content, hits )
values (1, 0, 'Offer absolutely nothing to the user', '<div><h1> Click here for a swift kick in the pants!</h1></div>', 0) ,
(1, 1, 'Make them an offer they can\'t refuse', '<div><h1> Click here for a free puppy!</h1></div>', 0);

