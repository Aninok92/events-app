export default function transformData(data) {
    const transformedEvents = [];

    for (const key in data) {
      transformedEvents.push({
        id: key,
        title: data[key].title,
        description: data[key].description,
        location: data[key].location,
        date: data[key].date,
        image: data[key].image,
        isFeatured: data[key].isFeatured,
      });
    }

    return transformedEvents
}