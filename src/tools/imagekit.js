import ImageKit from "imagekit-javascript";

const PUBLIC_KEY = "public_l5jvoRchQf05ICBwxWWf1DLGIeI="
const URL_ENDPOINT = "https://ik.imagekit.io/theHackSmith"
const AUTH_ENDPOINT = "https://sims-server-api.vercel.app/imagekit/auth"

var imagekitConfigOptions = { 
  urlEndpoint: URL_ENDPOINT,
  authenticationEndpoint: AUTH_ENDPOINT 
};
if(PUBLIC_KEY) imagekitConfigOptions.publicKey = PUBLIC_KEY;

const imagekit = new ImageKit(imagekitConfigOptions);

const fetchImageKitToken = async () => {
    try {
      const response = await fetch("https://sims-server-api.vercel.app/imagekit/auth", {
        method: 'GET', 
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error fetching ImageKit token: ${response.status}`);
      }
  
      const result = await response.json();
      return result; 
    } catch (error) {
      console.error('Error fetching ImageKit token:', error);
      throw error;
    }
};

const uploadFile = async (file, folder) => {
  const imageKitToken = await fetchImageKitToken();

  // Convert file to Base64 using FileReader
  const fileContent = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
    reader.readAsDataURL(file); // This will read the file as a Data URL (Base64 encoded)
  });

  // Remove the Data URL part (i.e., "data:image/png;base64,") if present
  const base64Content = fileContent.split(',')[1];

  return new Promise((resolve, reject) => {
    imagekit.upload({
      file: base64Content, // Use the Base64 content
      fileName: file.name, 
      folder: folder,
      token: imageKitToken.token,
      expire: imageKitToken.expire,
      signature: imageKitToken.signature,  
    }, function(err, result) {
      if(err) reject(err.message);
      resolve(result);
    });   
  });
};

export {fetchImageKitToken, uploadFile }