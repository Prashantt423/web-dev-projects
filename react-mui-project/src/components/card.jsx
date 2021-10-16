import * as React from "react";
import { useState } from "react";
import { makeStyles } from "@mui/styles";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Active from "./active";
import Expired from "./expired";
import ExpiredMob from "./expiredmob";
import ActiveMob from "./activeMob";
import dateInWord from "./dateInword";
const useStyles = makeStyles((theme) => ({
  contentWrapper: {
    display: "flex",
    width: "80%",
    backgroundColor: "white",
    padding: "15px",
    alignItems: "flex-end",
    justifyContent: "space-between",
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  ".contentWrapper > *": {
    flexBasis: "100%"
  },
  upperhalfCard: {
    display: "flex",
    margin: "5px 3px 5px 5px",
    minWidth: "80vw",
    alignItems: "center",
    [theme.breakpoints.up("sm") && theme.breakpoints.down("md")]: {
      display: "none"
    },
    [theme.breakpoints.up("xs") && theme.breakpoints.down("sm")]: {
      minwidth: "100px"
    }
  },
  upperhalfCardforTab: {
    display: "none",
    [theme.breakpoints.up("sm") && theme.breakpoints.down("md")]: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      minWidth: "600px",
      height: "60px"
    }
  },
  tabViewIconAndTitle: {
    display: "flex"
  },
  lowerhalfCard: {
    display: "flex",
    marginTop: "2vh",
    width: "70%",
    [theme.breakpoints.up("sm") && theme.breakpoints.down("md")]: {
      width: "100%"
    },
    [theme.breakpoints.up("xs") && theme.breakpoints.down("sm")]: {
      marginTop: "0"
    }
  },
  vl: {
    borderLeft: "1px solid black",
    height: "7vh",
    position: "abosolute",
    left: "50",
    width: "1vw",
    top: "0",
    marginLeft: "10px",
    [theme.breakpoints.up("xs") && theme.breakpoints.down("sm")]: {
      display: "none"
    },
    [theme.breakpoints.up("sm") && theme.breakpoints.down("md")]: {
      height: "3.5vh",
      width: "0.5vw"
    }
  },
  specifierBox: {
    display: "flex",
    flexDirection: "column",
    marginLeft: "1rem",
    boxSizing: "border-box"
  },
  chavIconinactive: {
    transition: " 300ms linear all",
    display: "flex",
    justifyContent: "center",
    width: "3rem",
    height: "3rem",
    borderRadius: "50%",
    border: "2px solid orange",
    textAlign: "center",
    alignItems: "center",
    "&:hover": {
      cursor: "pointer"
    },
    [theme.breakpoints.up("sm") && theme.breakpoints.down("md")]: {
      width: "2.5rem",
      height: "2.5rem"
    },
    [theme.breakpoints.up("xs") && theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  chavIconactive: {
    transform: "rotate(90deg)",
    transition: " 300ms linear all",
    display: "flex",
    justifyContent: "center",
    width: "3rem",
    height: "3rem",
    borderRadius: "50%",
    border: "2px solid yellow",
    textAlign: "center",
    alignItems: "center",
    backgroundColor: "yellow",
    "&:hover": {
      cursor: "pointer"
    },
    [theme.breakpoints.up("sm") && theme.breakpoints.down("md")]: {
      width: "2.5rem",
      height: "2.5rem"
    },
    [theme.breakpoints.up("xs") && theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },

  policyTitle: {
    fontFamily: "brandon-grotesque",
    fontSize: "22px",
    fontWeight: "bold",
    [theme.breakpoints.up("sm") && theme.breakpoints.down("md")]: {
      fontSize: "18px"
    }
  },
  titleSpecifier: {
    top: 0,
    fontFamily: "bitter",
    fontSize: "12px"
  },
  contentBox: {
    display: "flex",
    flexDirection: "column",
    width: "100%"
  },
  partnerIcon: {
    display: "block",
    padding: "auto",
    [theme.breakpoints.up("sm") && theme.breakpoints.down("md")]: {
      display: "none"
    }
  },
  horizontalRule: {
    border: "none",
    height: "1px",
    backgroundColor: "#acacac",
    width: "100%",
    [theme.breakpoints.up("sm") && theme.breakpoints.down("md")]: {
      width: "126%"
    }
  },
  mobileHrRule: {
    border: "none",
    height: "1px",
    backgroundColor: "#acacac",
    width: "100%",
    marginLeft: "1.8vw"
  },
  contentText: {
    fontFamily: "brandon-grotesque",
    fontSize: "14px",
    fontWeight: "bold"
  },
  partnerIconTab: {
    display: "none",
    [theme.breakpoints.up("sm") && theme.breakpoints.down("md")]: {
      display: "block"
    },
    [theme.breakpoints.up("xs") && theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  partnerIconTabImg: {
    [theme.breakpoints.up("sm") && theme.breakpoints.down("md")]: {
      width: "150px",
      height: "150px"
    }
  },
  paymentDate: {
    [theme.breakpoints.up("xs") && theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  price: {
    [theme.breakpoints.up("xs") && theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  renewal: {
    [theme.breakpoints.up("xs") && theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  partnerIconSm: {
    display: "none",
    [theme.breakpoints.up("xs") && theme.breakpoints.down("sm")]: {
      display: "block"
    }
  },
  partnerIconSmImg: {
    width: "50px",
    height: "50px"
  },
  lowerDataMobile: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "50px"
  },
  lowerData: {},
  mobileDiv: {
    display: "none",
    [theme.breakpoints.up("xs") && theme.breakpoints.down("sm")]: {
      display: "block",
      width: "100%"
    }
  },
  mobileDate: {
    display: "flex",
    flexDirection: "column"
  },
  mobileIconImg: {
    width: "90px",
    height: "90px"
  },
  mobileIcon: {
    marginRight: "10px"
  },
  titleMobile: {
    margin: "5px",
    fontFamily: "brandon-grotesque",
    fontSize: "15px",
    fontWeight: "bold"
  },
  descriptionMobile: {
    margin: "5px",
    fontFamily: "bitter",
    fontSize: "7px"
  },
  contentTextMobile: {
    margin: "5px",
    fontFamily: "bitter",
    fontSize: "7px",
    fontWeight: "light"
  },
  definition: {
    fontSize: "14px"
  },
  coverage: {
    display: "flex",
    minWidth: "12rem",
    justifyContent: "space-between",
    fontSize: "14px"
  },
  coverageMob: {
    display: "flex",
    justifyContent: "space-between",
    fontFamily: "bitter",
    fontSize: "7px",
    marginLeft: "5px",
    width: "100%",
    minWidth: "4rem"
  }
}));

function Card(props) {
  const [isClicked, setClick] = useState(false);
  function handleClick() {
    setClick(!isClicked);
  }
  const classes = useStyles();
  const dateNum = props.date.split("T");
  const dateWord = dateInWord(dateNum[0]);
  const start = props.coverage_start;
  const end = props.coverage_end;

  return (
    <div className={classes.wrapper}>
      {/* desktop and tab view */}
      <div className={classes.contentWrapper}>
        <div className={classes.contentBox}>
          <div className={classes.upperhalfCard}>
            <div
              className={
                isClicked ? classes.chavIconactive : classes.chavIconinactive
              }
              onClick={handleClick}
            >
              <ChevronRightIcon />
            </div>
            <div className={classes.specifierBox}>
              <div className={classes.policyTitle}>{props.title}</div>
              <div className={classes.titleSpecifier}>
                XXXX-XXXX-INS|{props.description}
              </div>
            </div>
            <div className={classes.partnerIconTab}>
              <img
                className={classes.partnerIconTabImg}
                src={props.img}
                alt="logoImage"
              />
            </div>
          </div>
          <div className={classes.upperhalfCardforTab}>
            <div className={classes.tabViewIconAndTitle}>
              <div
                className={
                  isClicked ? classes.chavIconactive : classes.chavIconinactive
                }
                onClick={handleClick}
              >
                <ChevronRightIcon />
              </div>
              <div className={classes.specifierBox}>
                <div className={classes.policyTitle}>{props.title}</div>
                <div className={classes.titleSpecifier}>
                  XXXX-XXXX-INS|{props.description}
                </div>
              </div>
            </div>
            <div className={classes.partnerIconTab}>
              <img
                className={classes.partnerIconTabImg}
                src={props.img}
                alt="logoImage"
              />
            </div>
          </div>
          <hr className={classes.horizontalRule} />
          <div className={classes.lowerhalfCard}>
            <div className={classes.paymentDate}>
              <div className={classes.contentText}>{dateWord}</div>
              <div className={classes.definition}>Payment date</div>
            </div>

            <div className={classes.vl}></div>
            <div className={classes.coverageDate}>
              <div className={classes.lowerData}>
                <div className={classes.contentText}>
                  {start} to {end}
                </div>
                <div className={classes.coverage}>
                  Coverage dates{" "}
                  {props.status === "active" ? <Active /> : <Expired />}
                </div>
              </div>
            </div>
            <div className={classes.vl}></div>
            <div className={classes.price}>
              <div className={classes.contentText}>{props.premium}</div>
              <div className={classes.definition} style={{ fontSize: "14px" }}>
                Price/Premium
              </div>
            </div>
            {props.renewal ? <div className={classes.vl}></div> : null}
            {props.renewal ? (
              <div className={classes.renewal}>
                <div className={classes.contentText}>{props.renewal}</div>
                <div className={classes.definition}>Renewal</div>
              </div>
            ) : null}
          </div>
        </div>
        <div className={classes.partnerIcon}>
          <img src={props.img} alt="Icon" />
        </div>
      </div>

      {/* mobile view */}
      <div className={classes.mobileDiv}>
        <div className={classes.titleMobile}>{props.title}</div>
        <div className={classes.descriptionMobile}>
          XXXX-XXXX-INS|{props.description}
        </div>
        <hr className={classes.mobileHrRule} />
        <div className={classes.lowerDataMobile}>
          <div className={classes.mobileDate}>
            <div className={classes.contentTextMobile}>
              {start} to {end}
            </div>
            <div className={classes.coverageMob}>
              Coverage dates
              {props.status === "active" ? <ActiveMob /> : <ExpiredMob />}
            </div>
          </div>
          <div className={classes.mobileIcon}>
            <img className={classes.mobileIconImg} src={props.img} alt="Icon" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
