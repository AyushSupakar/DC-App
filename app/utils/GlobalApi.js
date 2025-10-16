import Constants from "expo-constants";
import { gql, GraphQLClient, request } from 'graphql-request';

const Master_URL =Constants.expoConfig.extra.HYGRAPH_URL
const TOKEN=Constants.expoConfig.extra.HYGRAPH_TOKEN;

// Ensure configuration is available
if (!Master_URL || !TOKEN) {
  console.error("Configuration error:", {
    url: Master_URL ? "configured" : "missing",
    token: TOKEN ? "configured" : "missing",
    config: Constants.expoConfig?.extra
  });
  throw new Error('Hygraph configuration is missing. Please check app.config.js and ensure HYGRAPH_URL and HYGRAPH_TOKEN are properly set.');
}

const client = new GraphQLClient(Master_URL, {
  headers: {
    Authorization: `Bearer ${TOKEN}`
  },
});

const getCategories= async ()=>{
  const query2 = gql`
  query MyQuery {
  categories {
    id
    name
    icon {
      url
    }
  }
}`

const result =  await client.request(query2);

    return result;


}



const getSlider = async ()=>{

    
    const query1 = gql`query GetSliders {
  sliders {
    id
    name
    image {
      url
    }
  }
}`


 const result =  await client.request(query1);

    return result;
    }


  const getServices = async () => {
        
    
    const query3 = gql`query getServices {
  services(first:30) {
    id
    name
    images {
      url
    }
    email
    category {
      name
    }
    about
  }
}`
    
    
     const result =  await client.request(query3);
    
        return result;
    }

const getUserBookings= async (useremail) => {
  const query5 = gql`query MyQuery {
  bookings(orderBy: updatedAt_DESC, where: {useremail: "`+useremail+`"}) {
    service {
      name
      images {
        url
        id
      }
    }
    time
    date
    bookingProgress
    id
    details
    address
  }
}`
const result =  await client.request(query5);
    
        return result;
}
const getServicesByCategory = async (category) => {
  const query4 = gql`query getServices {
  services(first: 100, where: {category_some: {name_in: "`+category+`"}}) {
    id
    name
    images {
      url
    }
    email
    category {
      name
    }
    about
  }
}`
const result =  await client.request(query4);
    
        return result;
}
const getServicesBySearch = async (searchstr) => {
  // Sanitize the search string
  const sanitizedSearch = searchstr.replace(/[^\w\s]/gi, '');
  
  const query6 = gql`
    query SearchServices($searchTerm: String!) {
      services(where: {_search: $searchTerm}) {
        id
        name
        images {
          url
        }
        about
        category {
          name
        }
        email
      }
    }
  `;

  try {
    const result = await client.request(query6, { searchTerm: sanitizedSearch });
    return result;
  } catch (error) {
    console.error('Search error:', error);
    return { services: [] }; // Return empty array on error
  }
}

const createBooking = async (data) => {
  const mutaionQuery = gql`mutation createBooking {
  createBooking(
    data: {bookingProgress: booked,
     service: {connect: {id: "`+data.serviceid+`"}},
      date: "`+data.date+`",
       time: "`+data.time+`",
        useremail: "`+data.useremail+`",
         username: "`+data.username+`",
          location: "`+data.location+`",
           details: "`+data.details+`",
           phonenumber: "`+data.phonenumber+`",
            name: "`+data.name+`",
             address: "`+data.address+`",
              latLong: "`+data.latlong+`"
            }
  ) {
    id
  }
  publishManyBookings(to: PUBLISHED) {
    count
  }
}`


console.log("data=",data);

// await client.request(mutaionQuery);

const result =  await request(Master_URL, mutaionQuery);
    
        return result;
}



export default {
    getSlider,
    getCategories,
    getServices,
    getServicesByCategory,
    createBooking,
    getUserBookings,
    getServicesBySearch
}