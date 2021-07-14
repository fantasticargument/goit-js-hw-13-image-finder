// const options = {
//     headers: {
//         key : '22499502-59f4ba6839ef4b23507a26e20',
//     },
// };

fetch('https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=дерево&page=1&per_page=12&key=22499502-59f4ba6839ef4b23507a26e20')
    .then(respons => respons.json())
    .then(console.log) 