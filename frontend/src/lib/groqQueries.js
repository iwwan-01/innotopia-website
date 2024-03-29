import { groq } from 'next-sanity';

export const companiesQuery = groq`*[_type == 'company'] | order(publishedAt desc) {
    _id,
    title,
    "logo": mainImage.asset->url
  }`;

export const servicesQuery = groq`*[_type =='service'] | order(_createdAt asc){
    _id,
    title,
    body,
    "icon": icon.name
  }`;
export const projectsQuery = groq`*[_type == 'post'] | order(publishedAt desc) [0..2]{
    _id,
    title,
    "slug": slug.current,
    "mainImage": mainImage.asset->url,
    body
  }`;

export const testimonialsQuery = groq`*[_type == 'testimonial'] | order(publishedAt desc) [0..2]{
    _id,
    personName,
    personPosition,
    "personImage": personImage.asset->url,
    body,
    companyName,
    "comapnyLogo": companyLogo.asset->url
  }`;

export const teamMembersQuery = groq`*[_type == 'teamMember'] | order(_createdAt asc){
  _id,
  personName,
  personPosition,
  "personImage": personImage.asset->url,
}`;

export const internsQuery = groq`*[_type == 'intern'] | order(publishedAt desc){
  _id,
  personName,
  personPosition,
  "personImage": personImage.asset->url,
  body,
  personPortfolioLink
}`;

export const eventsQuery = groq`*[_type == 'event'] | order(publishedAt desc){
  _id,
  eventName,
  eventDate
}`;
