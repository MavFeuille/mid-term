INSERT INTO users (email, password)
VALUES
 ('mario@hotmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'), ('ktwist0@deviantart.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.' ),('kalki@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.' ),
 ('tylerromero@inbox.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO items (
  title, price, description, cover_photo_url, thumbnail_photo_url, category, user_id, seller_id)
  VALUES (
  'Skin Ceuticals CE FERULIC (30ml)', 190, 'A patented daytime vitamin C serum for skin that delivers advanced environmental protection, all the while improving the appearance of fine lines and wrinkles, loss of firmness, and brightening your skin complexion.', 'https://www.skinceuticals.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-acd-skinceuticals-master-catalog/default/dw3ffce951/pdpimages/C-E-Ferulic-635494263008-SkinCeuticals.jpg?sw=465&sfrm=jpg&q=70', 'https://www.skinceuticals.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-acd-skinceuticals-master-catalog/default/dw3ffce951/pdpimages/C-E-Ferulic-635494263008-SkinCeuticals.jpg?sw=270&sfrm=jpg&q=70', 1, 2, 1);

INSERT INTO items (
  title, price, description, cover_photo_url, thumbnail_photo_url, category, user_id, seller_id)
  VALUES (
  'Elemis Pro-Collagen Overnight Matrix Wrinkle Smoothing Night Cream (50ml)', 294,	'A revolutionary night cream that leaves skin looking firmer, smoother and less creased appearance with visible bounce-back.', 'https://us.elemis.com/media/catalog/product/cache/bd1f6bda496241c1e5f31bf01582d3f4/5/0/50143_pro-collagen_overnight_matrix_primary_texture_1.png?auto=webp&optimize=high&crop=1:1&width=700','https://us.elemis.com/media/catalog/product/cache/bd1f6bda496241c1e5f31bf01582d3f4/5/0/50143_pro-collagen_overnight_matrix_primary_back.png?auto=webp&optimize=high&crop=1:1&width=700', 1, 3, 1);

INSERT INTO items (
  title, price, description, cover_photo_url, thumbnail_photo_url, category, user_id, seller_id)
  VALUES(
  'La Prairie Skin Caviar Luxe Cream (50ml)',	685, 'Inspired by the serenity of Swiss lakes and enriched with the potency of Swiss caviar, this masterpiece is the height of lifting and indulgence. The spirit of the House is contained in the iconic cobalt blue jar. Designed in the codes of Bauhaus and infused with the colour of Niki de Saint Phalle’s “Nanas”, it is an homage to a pivotal encounter between the House and the world of art, to the fusion of arts and science inherent to La Prairie.', 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/scp-images-copy-1534362599.jpg?crop=1xw:1xh;center,top&resize=480:*', 'http://cdn.luxuo.com/2015/08/Skin-Caviar-Luxe-Cream.jpg', 1, 4, 1);


  INSERT INTO favourite_items (
     items_id, user_id
  )
  VALUES (1, 2);


/*items id is not present error when trying to insert into favourites
npm reset:db not working bcuz line 7 thumnail. but its correct */
