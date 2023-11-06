import multer from "multer";

// import path from "path";
// const destination = path.resolve("tmp");

// const storage = multer.diskStorage({
//     destination,
//     filename: (req, file, cb) => {
//         const uniquePreffix = `${Date.now()}_${Math.round(Math.random() * 1E9)}`;
//         const filename = `${uniquePreffix}_${file.originalname}`;
//         cb(null, file.originalname);
//     }
// });
// const limits = {
//     fileSize: 5 * 1024 * 1024
// };
// const upload = multer({
//     storage,
//     limits
// });

const storage = multer.memoryStorage();
const upload = multer({ storage });


export default upload;