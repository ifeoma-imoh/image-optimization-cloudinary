import "../Grid.css";

const baseUrl = "https://res.cloudinary.com/ifeomaimoh/image/upload";

const generateSrcSet = (image) =>
  `
  ${baseUrl}/w_400,h_300,c_scale/v${image.version}/${image.public_id}.${image.format} 400w,
  ${baseUrl}/w_800,h_600,c_scale/v${image.version}/${image.public_id}.${image.format} 800w,
  ${baseUrl}/w_1200,h_900,c_scale/v${image.version}/${image.public_id}.${image.format} 1200w,
  `;

const ImageGrid = ({ images }) => {
  return (
    <div className="gallery">
      {images.map((image) => (
        <img
          key={image.public_id}
          src={`${baseUrl}/w_400,h_200,c_scale/v${image.version}/${image.public_id}.${image.format}`}
          srcSet={generateSrcSet(image)}
          sizes="(max-width: 768px) 300px,(max-width: 992px) 600px, 900px"
        />
      ))}
    </div>
  );
};

export default ImageGrid;
