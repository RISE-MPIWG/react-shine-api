// https://github.com/storybooks/react-treebeard/issues/148
//had to modify these styles to get them to work in firefox
export default {
  tree: {
    base: {
      listStyle: "none",
      backgroundColor: "transparent",
      margin: 0,
      padding: 0,
      color: "#191919",
      fontFamily: "lucida grande ,tahoma,verdana,arial,sans-serif",
      fontSize: "14px"
    },
    node: {
      base: {
        position: "relative"
      },
      container: {
        link: {
          cursor: "pointer",
          position: "relative",
          padding: "0px 5px",
          display: "block"
        },
        activeLink: {
          background: "rgb(245,245,245)",
          padding: "0px 5px",
          paddingRight: 5,
        }
      },
      toggle: {
        base: {
          position: "relative",
          display: "inline-block",
          verticalAlign: "top",
          marginLeft: "-5px",
          height: "24px",
          width: "24px"
        },
        wrapper: {
          position: "absolute",
          top: "50%",
          left: "50%",
          margin: "-7px 0 0 -7px",
          height: "14px"
        },
        height: 14,
        width: 14,
        arrow: {
          fill: "#191919",
          strokeWidth: 0
        }
      },
      header: {
        base: {
          display: "inline-block",
          verticalAlign: "top",
          color: "#191919",
          cursor: 'default'
        },
        parentButton: {
          width: 12,
          height: 12,
          marginRight: 5,
          display: 'inline-block',
          borderRadius: 3,
          backgroundColor: '#000',
        },
        connector: {
          width: "2px",
          height: "12px",
          borderLeft: "solid 2px black",
          borderBottom: "solid 2px black",
          position: "absolute",
          top: "0px",
          left: "-21px"
        },
        title: {
          lineHeight: "24px",
          verticalAlign: "middle"
        }
      },
      subtree: {
        listStyle: "none",
        paddingLeft: "19px"
      },
      loading: {
        color: "#E2C089"
      }
    }
  }
};
