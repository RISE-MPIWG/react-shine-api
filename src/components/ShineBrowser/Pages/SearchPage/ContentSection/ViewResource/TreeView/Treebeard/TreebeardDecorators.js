import React from "react";
import PropTypes from "prop-types";
import { VelocityComponent } from "velocity-react";
import styled from "@emotion/styled";

const Div = styled("div", {
  shouldForwardProp: prop => ["className", "children"].indexOf(prop) !== -1
})(({ style }) => style);
const Polygon = styled("polygon", {
  shouldForwardProp: prop => ["className", "children", "points"].indexOf(prop) !== -1
})(({ style }) => style);

const Loading = styled(({ className }) => {
  return <div className={className}>loading...</div>;
})(({ style }) => style);

Loading.propTypes = {
  style: PropTypes.object
};

const Toggle = ({ style }) => {
  const { height, width } = style;
  const midHeight = height * 0.5;
  const points = `0,0 0,${height} ${width},${midHeight}`;

  return (
    <span style={style.base}>
      <span style={style.wrapper}>
        <svg height={height} width={width}>
          <Polygon points={points} style={style.arrow} />
        </svg>
      </span>
    </span>
  );
};
Toggle.propTypes = {
  style: PropTypes.object
};

const Header = ({ style, node, onCheck, isChecked }) => {
  const iconType = node.children ? "folder" : "file";
  const iconClass = `fa fa-${iconType}`;
  const iconStyle = { marginRight: "5px", color: "#191919" };
  return (
    <span style={style.base}>
      <span style={style.title}>
        {/* hide folders */}
        {iconType == 'folder' ? null : <i className={iconClass} style={iconStyle} />}
        {node.children ? 
          <div style={style.parentButton} class={'shineParentSectionButton'} onClick={e => onCheck(node, !isChecked, e)}></div>
        :
        <input
          type="checkbox"
          checked={isChecked}
          name={node.uuid}
          onChange={e => onCheck(node, !isChecked, e)}
        />
        }
        {node.name}
      </span>
    </span>
  );
};

class Container extends React.Component {
  render() {
    // custom overrides. see https://github.com/storybooks/react-treebeard/issues/148  and  https://github.com/ubl-chj/collections-ui/blob/master/packages/manifest-viewer/src/components/ui/controls/ContentTreeDecorators.tsx#L54-L56
    const { style, decorators, terminal, onClick, onCheck, isChecked, node } = this.props;
    const { active } = node;
    const container = active ? style.container.activeLink : style.container.link;

    return (
      <div onClick={onClick} ref={ref => (this.clickableRef = ref)} style={container}>
        {!terminal ? this.renderToggle() : null}

        <decorators.Header node={node} style={style.header} onCheck={onCheck} isChecked={isChecked} />
      </div>
    );
  }

  renderToggle() {
    const { animations } = this.props;

    if (!animations) {
      return this.renderToggleDecorator();
    }

    return (
      <VelocityComponent animation={animations.toggle.animation} duration={animations.toggle.duration} ref={ref => (this.velocityRef = ref)}>
        {this.renderToggleDecorator()}
      </VelocityComponent>
    );
  }

  renderToggleDecorator() {
    const { style, decorators } = this.props;

    return <decorators.Toggle style={style.toggle} />;
  }
}
Container.propTypes = {
  style: PropTypes.object.isRequired,
  decorators: PropTypes.object.isRequired,
  terminal: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  animations: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]).isRequired,
  node: PropTypes.object.isRequired
};

export default {
  Loading,
  Toggle,
  Header,
  Container,
};
