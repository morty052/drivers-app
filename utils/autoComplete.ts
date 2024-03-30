// Define the request payload
export async function autoComplete(
  input: string
): Promise<{ address: string; placeId: string }[] | null> {
  try {
    const payload = {
      input,
      locationBias: {
        circle: {
          center: {
            latitude: "48.7988296",
            longitude: "-95.3421687",
          },
          radius: "500.0",
        },
      },
    };

    // Set the headers
    const headers = {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": "AIzaSyA0i6pUgKu9bNTdR_PKL7Pk-8MjDEsZwL8", // Replace with your actual API key
    };

    // Make the POST request
    const url = "https://places.googleapis.com/v1/places:autocomplete";
    const res = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    // const suggestions = data?.suggestions.map(
    //   (item: any) => item.placePrediction.structuredFormat.mainText.text
    // );

    const suggestions = data?.suggestions.map((item: any) => ({
      address: item.placePrediction.structuredFormat.mainText.text,
      placeId: item.placePrediction.placeId,
    }));
    console.log(
      data.suggestions[0].placePrediction.structuredFormat.mainText.text
    );

    return suggestions;
  } catch (error) {
    console.error(error);
    return null;
  }
}
