const stepTestRouter = require("express").Router();
const stepTestController = require("../controllers/stepTestController");
const upload = require("../config/multerConfig");

stepTestRouter.post(
  "/",
  upload.array("images", 5),
  stepTestController.createStepTest
);

stepTestRouter.get("/", stepTestController.listStepTest);
stepTestRouter.get("/:id", stepTestController.getStepTestById);

stepTestRouter.put(
  "/:id",
  upload.array("images", 5),
  stepTestController.updateStepTest
);

stepTestRouter.delete("/:id", stepTestController.deleteStepTest);
module.exports = stepTestRouter;
