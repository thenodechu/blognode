import React from "react";
import "./bottomMenu.css";
class MenuBottom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="centerMenu">
        <ul className="bottomMenu">
          <li className="elem">Новости</li>
          <li className="elem right">Технологии</li>
          <li className="elem right">Программирование</li>
          <li className="elem right">Администрирование</li>
          <li className="elem right">Дизайн</li>
          <li className="elem right">Менеджмент</li>
        </ul>
      </div>
    );
  }
}

export default MenuBottom;
