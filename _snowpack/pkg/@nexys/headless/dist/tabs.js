import { r as react } from '../../../common/index-ae389540.js';

const TabsGeneric = (Ul, Li) => ({ tabs, tabIndex = 0, setTabIndex }) => (react.createElement(Ul, null, tabs.map((tab, i) => (react.createElement(Li, { key: i, label: tab.label, isSelected: i === tabIndex, onClick: () => setTabIndex(i) })))));

export default TabsGeneric;
