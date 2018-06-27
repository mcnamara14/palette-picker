exports.seed = function(knex, Promise) {
  return knex('palettes').del()
    .then(() => knex('projects').del()) 
    .then(() => {
      return Promise.all([
        knex('projects').insert({
          name: 'Project 1'
        }, 'id')
        .then(project => {
          return knex('palettes').insert([
            { name: 'Palette 1', 
              color1: '#111111',
              color2: '#222222',
              color3: '#333333',
              color4: '#444444',
              color5: '#555555',
              project_id: project[0] },
            { name: 'Palette 2',
              color1: '#E37B40',
              color2: '#46B29D',
              color3: '#DE5B49',
              color4: '#324D5C',
              color5: '#F0CA4D', 
              project_id: project[0] },
          ])
        })
        .then(() => console.log('Seeding complete!'))
        .catch(error => console.log(`Error seeding data: ${error}`))
      ]) // end return Promise.all
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};