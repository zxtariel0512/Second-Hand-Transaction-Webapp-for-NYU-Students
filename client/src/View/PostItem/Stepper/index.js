import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import MessageContext from "../../../Context/MessageContext";

// Pages
import BasicInfo from "../BasicInfo";
import MoreDetails from "../MoreDetails";
import Review from "../Reviews/index";
import UploadPostItem from "../Upload/";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginBottom: "100px",
  },
  button: {
    marginRight: theme.spacing(1),
    marginLeft: "85px",
  },
  instructions: {
    width: "100%",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ["Basic Info", "More Details", "Review"];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return <BasicInfo />;
    case 1:
      return <MoreDetails />;
    case 2:
      return <Review />;
    default:
      return "Unknown step";
  }
}

export default function HorizontalLinearStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const steps = getSteps();

  const { setMessage } = useContext(MessageContext);

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
    setMessage("Saved Successfully!");
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setMessage(null);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <Box display="flex" justifyContent="center">
        {activeStep === steps.length ? (
          <div>
            <UploadPostItem />
          </div>
        ) : (
          <div>
            <div className={classes.instructions}>
              {getStepContent(activeStep)}
            </div>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.button}
                variant="outlined"
              >
                Back
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleNext}
                className={classes.button}
              >
                {activeStep === steps.length - 1 ? "Submit" : "Next"}
              </Button>
            </div>
          </div>
        )}
      </Box>
    </div>
  );
}
