export const initialState = {
  posts: {
    data: [
      {
        id: '1', 
        author: 'Michael Plum',
        title: 'FREE - icandy pushchair and accessories', 
        content: 'iCandy pushchair, plus rain cover and cot. The handle bar broke and we tried to fix but one side not click in so not locking, someone handy should be able to fix.',
        date: '31.01.2019',
        updateDate: '3.02.2019',
        mail: 'MichaelPlum@gmail.com',
        status: 'published',
        image: 'https://i.ebayimg.com/00/s/MTAyNFg3Njg=/z/MAUAAOSwWEZec1xu/$_86.JPG',
        phone: '987 594 000',
        location: 'Oxford',
        userId: '1',
      },
      {
        id: '2',
        author: 'Billy Swan',
        title: 'Looking for Football Players',
        content: 'If you are new to LONDON and you are looking for social football games near Oakwood Station. We have friendly games with local friends, join us now. :)',
        date: '18.10.2019',
        updateDate: '19.10.2019',
        mail: 'BillySwan@gmail.com',
        status: 'published',
        image: 'https://i.ebayimg.com/00/s/NDAwWDUzMw==/z/A4gAAOSwAsFebq0A/$_86.JPG',
        location: 'London',
        userId: '2',
      },
      {
        id: '3',
        author: 'Billy Swan',
        title: 'Attractive 2 bed Victoria Terrace',
        content: 'Very lovely Victorian Terraces house many original features, two very spacious double bedrooms plus a small nursery/ office or childs room.',
        date: '17.02.2020',
        updateDate: '28.02.2020',
        mail: 'BillySwan@gmail.com',
        price: '200',
        status: 'published',
        image: 'https://i.ebayimg.com/00/s/NjQwWDQ4MA==/z/jyMAAOSwUlBecOdJ/$_86.JPG',
        phone: '123 594 000',
        location:'Liverpool',
        userId: '2',
      },
      {
        id: '4',
        author: 'John Doe',
        title: 'Looking for an Dental Receptionist',
        content: 'Well established Dental Group is looking for an Dental Receptionist to start ASAP. Ideal candidate must have excellent communication skills, presentable, can work as part of a team and be flexible with working hours (able to work overnight shifts).',
        date: '13.01.2016',
        updateDate: '14.04.2017',
        mail: 'JohnLDoe@gmail.com',
        price: '5000',
        status: 'published',
        image:'https://6img.wprost.pl/_thumb/6a/59/786f69c16365c84a6c63a6ebef04.jpeg',
        userId: '3',
      },
      {
        id: '5',
        author: 'John Doe',
        title: 'Dog Walker',
        content: 'We are a husband and wife team based in Alva. We cover the hillfoots and Stirling area. We have many years of experience with different breeds of dogs. If we can help with your dog walking, or just popping in to feed your dog please call Eddie or Becky.',
        date: '17.03.2020',
        updateDate: '19.03.2020',
        mail: 'JohnLDoe@gmail.com',
        price: '20',
        status: 'draft',
        phone: '888 594 000',
        userId: '3',
      },
    ],
    loading: {
      active: true,
      error: false,
    },
  },
  user: {
    id: '3',
    logged: false,
    mail: 'JohnLDoe@gmail.com',
    author: 'John Doe',
  },
};
