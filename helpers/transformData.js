export default function transformData(data) {
    const transformedEvents = [];

    for (const key in data) {
      transformedEvents.push({
        id: key,
        ...data[key]
      });
    }

    return transformedEvents
}