// schemas/postSchema.ts
import * as yup from "yup";

export const postSchema = yup
  .object({
    postTitle: yup.string().required("Post title is required"),
    postContent: yup.string().required("Post content is required"),
    scheduledDate: yup.string().required("Date is required"),
    scheduledTime: yup.string().required("Time is required"),
    selectedPlatforms: yup
      .array()
      .min(1, "Select at least one platform")
      .of(yup.string().required()),
       mediaFile: yup
      .mixed()
      .required("Media is required")
      .test(
        "fileSize",
        "File is too large (max 10MB)",
        (file) => !file || (file && file.size <= 10 * 1024 * 1024)
      )
      .test(
        "fileType",
        "Unsupported file format",
        (file) =>
          !file ||
          ["image/jpeg", "image/png", "video/mp4"].includes(file.type)
      ),
  })
  .test(
    "schedule-validation",
    "Both date and time are required to schedule",
    (values) => {
      const hasDate = !!values.scheduledDate;
      const hasTime = !!values.scheduledTime;
      return (hasDate && hasTime) || (!hasDate && !hasTime);
    }
  );
