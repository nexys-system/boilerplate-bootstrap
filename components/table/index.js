import SuperList from "../../_snowpack/pkg/@nexys/headless/dist/list/list-super.js";
import {
  GlobalSearch,
  HeaderUnit,
  FilterUnit,
  OrderController,
  Row,
  ColCell,
  RecordInfo,
  NoRow,
  ListWrapper,
  ListContainer,
  ListHeader,
  ListBody,
  Loader
} from "./ui/index.js";
import Pagination from "./ui/pagination.js";
const List = () => SuperList({
  HeaderUnit,
  FilterUnit,
  OrderController,
  ColCell,
  GlobalSearch,
  NoRow,
  Row,
  ListWrapper,
  ListContainer,
  ListHeader,
  ListBody,
  RecordInfo,
  Pagination,
  Loader
});
export default List;
