const sidebarStyles = {
    drawerPaper: {
      border: "none",
      position: "fixed",
      top: "0",
      bottom: "0",
      left: "0",
      zIndex: "1",
    },
    logo: {
      position: "relative",
      padding: "15px 15px",
      zIndex: "4",
      "&:after": {
        content: '""',
        position: "absolute",
        bottom: "0",

        height: "1px",
        right: "15px",
        width: "calc(100% - 30px)",
        backgroundColor: "rgba(180, 180, 180, 0.3)"
      }
    },
    logoLink: {
      textTransform: "uppercase",
      padding: "5px 0",
      display: "block",
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: "300",
      lineHeight: "1.5em",
      fontSize: "18px",
      textAlign: "left",
      fontWeight: "400",
      lineHeight: "30px",
      textDecoration: "none",
      backgroundColor: "transparent",
      "&,&:hover": {
        color: "#FFFFFF"
      }
    },
    sidebarWrapper: {
      position: "relative",
      height: "calc(100vh - 75px)",
      overflow: "auto",
      width: "260px",
      zIndex: "4",
      overflowScrolling: "touch"
    },
    logoImage: {
      width: "30px",
      display: "inline-block",
      maxHeight: "30px",
      marginLeft: "10px",
      marginRight: "15px"
    },
    img: {
      width: "35px",
      top: "22px",
      position: "absolute",
      verticalAlign: "middle",
      border: "0"
    },
    background: {
      position: "absolute",
      zIndex: "1",
      height: "100%",
      width: "100%",
      display: "block",
      top: "0",
      left: "0",
      backgroundSize: "cover",
      backgroundPosition: "center center",
      "&:after": {
        position: "absolute",
        zIndex: "3",
        width: "100%",
        height: "100%",
        content: '""',
        display: "block",
        background: "#000",
        opacity: ".8"
      }
    },
    list: {
      marginTop: "20px",
      paddingLeft: "0",
      paddingTop: "0",
      paddingBottom: "0",
      marginBottom: "0",
      listStyle: "none",
      position: "unset"
    },
    item: {
      position: "relative",
      display: "block",
      textDecoration: "none",
      "&:hover,&:focus,&:visited,&": {
        color: "#FFFFFF"
      }
    },
    itemLink: {
      width: "auto",
      transition: "all 300ms linear",
      margin: "10px 15px 0",
      borderRadius: "3px",
      position: "relative",
      display: "block",
      padding: "10px 15px",
      backgroundColor: "transparent"
    },
    itemIcon: {
      width: "24px",
      height: "30px",
      fontSize: "24px",
      lineHeight: "30px",
      float: "left",
      marginRight: "15px",
      textAlign: "center",
      verticalAlign: "middle",
      color: "rgba(255, 255, 255, 0.8)"
    },
    itemText: {
      margin: "0",
      lineHeight: "30px",
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: "300",
      lineHeight: "1.5em",
      fontSize: "14px",
      color: "#FFFFFF"
    },
}

export default sidebarStyles
