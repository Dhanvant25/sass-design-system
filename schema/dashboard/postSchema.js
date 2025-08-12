// schemas/postSchema.ts
import * as yup from "yup";

export const postSchema = yup
  .object({
    postTitle: yup.string().required("Post title is required"),
    postContent: yup.string().required("Post content is required"),
    scheduledDate: yup.string().nullable(),
    scheduledTime: yup.string().nullable(),
    selectedPlatforms: yup
      .array()
      .min(1, "Select at least one platform")
      .of(yup.string().required()),
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
