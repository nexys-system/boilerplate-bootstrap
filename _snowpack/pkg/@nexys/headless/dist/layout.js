import { r as react } from '../../../common/index-ae389540.js';
import { R as Redirect } from '../../../common/react-router-0b75c91d.js';

const CardsHeadless = (Card, Col, Row) => ({ cards, data, setData }) => (react.createElement(Row, null, cards.map(({ width = 6, title, subtitle, Component }, i) => (react.createElement(Col, { key: i, width: width },
    react.createElement(Card, { title: title, subtitle: subtitle },
        react.createElement(Component, { data: data, setData: setData })))))));

const CardsWithTabs = (Card, Tabs, Col, Row) => {
    const Cards = CardsHeadless(Card, Col, Row);
    return ({ cards, data, setData }) => {
        if (Array.isArray(cards)) {
            return react.createElement(Cards, { cards: cards, data: data, setData: setData });
        }
        const [tabIndex, setTabIndex] = react.useState(0);
        const arr = Object.entries(cards);
        const tabs = arr.map(([label]) => ({ label }));
        const cardsTab = arr[tabIndex][1];
        return (react.createElement(react.Fragment, null,
            react.createElement(Tabs, { tabs: tabs, tabIndex: tabIndex, setTabIndex: setTabIndex }),
            react.createElement(Cards, { cards: cardsTab, data: data, setData: setData })));
    };
};

const Layout = (Card, Tabs, Header, Col, Row) => {
    const CardsWithTabs$1 = CardsWithTabs(Card, Tabs, Col, Row);
    return ({ cards, title, description, backRedirect }) => ({ data: dataIn }) => {
        const [redirect, setRedirect] = react.useState();
        const [data, setData] = react.useState(dataIn);
        if (redirect) {
            return react.createElement(Redirect, { to: redirect });
        }
        return (react.createElement(react.Fragment, null,
            react.createElement(Header, { title: title, description: description }),
            react.createElement(CardsWithTabs$1, { cards: cards, data: data, setData: setData }),
            backRedirect && (react.createElement("div", { className: "float-right" },
                react.createElement("button", { onClick: () => setRedirect(backRedirect), type: "button", className: " btn-sm btn btn-secondary" }, "Back")))));
    };
};

export default Layout;
