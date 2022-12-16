import { Box, Container, Avatar, Grid, Typography, Stack } from "@mui/material";
import { selectListDepart } from "../../redux/depart/departSelector";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchDeparts } from "../../redux/depart/departThunk";
import PlaceIcon from "@mui/icons-material/Place";
import { Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import usePagination from "../../util/pagination";

const PER_PAGE = 8;

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDeparts());
  }, [dispatch]);

  const listDepart = useSelector(selectListDepart);

  let [page, setPage] = useState(1);
  const count = Math.ceil(listDepart?.length / PER_PAGE);
  const dataPagination = usePagination(listDepart, PER_PAGE);
  const handleChange = (e, p) => {
    setPage(p);
    dataPagination.jump(p);
  };

  return (
    <Container className="my-12">
      <Box>
        <Typography align="center" className="font-bold text-2xl mb-10">
          DANH SÁCH TOÀN BỘ CĂN HỘ <b className="text-sky-400">KING HOUSE</b>
        </Typography>
        <Grid container spacing={0}>
          {dataPagination?.currentData()?.map((data, index) =>
            data?.status === "Đang Hot" ? (
              <Grid
                item
                xs={6}
                sm={4}
                md={3}
                lg={3}
                xl={3}
                className="ease-in duration-75 hover:shadow hover:shadow-slate-500 py-3  hover:scale-105 rounded-lg relative"
              >
                <Link to={`/depart/` + data?._id}>
                  <img
                    alt=""
                    src={require("../../assets/hot.png")}
                    className="absolute top-0 right-0 z-50 w-20"
                  />
                  <Avatar
                    variant="square"
                    className="h-36 w-36 md:h-48 lg:h-60 xl:h-60  md:w-48 lg:w-64 xl:w-64 object-cover rounded  mb-2 mx-auto"
                    src={
                      process.env.REACT_APP_API_URL +
                      "/departs/" +
                      data?.photo?.[0]
                    }
                  />
                  <Typography
                    sx={{ paddingLeft: { xs: 3, sm: 1, md: 1 } }}
                    className="font-bold text-md "
                  >
                    {data?.name}
                  </Typography>
                  <Typography
                    sx={{ paddingLeft: { xs: 3, sm: 1, md: 1 } }}
                    className="font-bold text-sky-500 mt-2 text-sm"
                  >
                    <PlaceIcon className="w-5"></PlaceIcon>
                    {data?.districtHouse}
                  </Typography>
                  <Typography
                    sx={{ paddingLeft: { xs: 3, sm: 1, md: 1 } }}
                    className="text-green-600 font-bold text-md"
                  >
                    {data?.type}
                  </Typography>
                  <Typography
                    sx={{ paddingLeft: { xs: 3, sm: 1, md: 1 } }}
                    className="text-red-500 font-bold mt-2 text-sm"
                  >
                    {data?.price} VNĐ
                  </Typography>
                </Link>
              </Grid>
            ) : (
              <Grid
              item
              xs={6}
              sm={4}
              md={3}
              lg={3}
              xl={3}
              className="ease-in duration-75 hover:shadow hover:shadow-slate-500 py-3 hover:scale-105 rounded-lg "
            >
              <Link to={`/depart/` + data?._id} className="relative" >
     
                <Typography className="absolute top-0 right-5 z-50 text-red-600 font-bold line-through ">{data?.price} đ</Typography>
                <Avatar
                  variant="square"
                  className="h-36 w-36 md:h-48 lg:h-60 xl:h-60  md:w-48 lg:w-64 xl:w-64 object-cover rounded mb-2 mx-auto"
                  src={process.env.REACT_APP_API_URL + "/departs/" + data?.photo?.[0]}
                ></Avatar>
                <Typography  sx={{paddingLeft:{xs:3,sm:1,md:1}}}  className="font-bold text-md ">
                  {data?.name}
                </Typography>
                <Typography  sx={{paddingLeft:{xs:3,sm:1,md:1}}}  className="font-bold text-sky-500 mt-2 text-sm">
                  <PlaceIcon className="w-5"></PlaceIcon>
                  {data?.districtHouse}
                </Typography>
                <Typography  sx={{paddingLeft:{xs:3,sm:1,md:1}}}  className="text-green-600 font-bold text-md">
                {data?.type}
              </Typography>
                <Typography  sx={{paddingLeft:{xs:3,sm:1,md:1}}} className="text-red-500 font-bold mt-2 text-sm">
                  {data?.pricePromotion} VNĐ
                </Typography>
              </Link>
            </Grid>
            )
          )}
        </Grid>
      </Box>
      <Stack className="flex justify-center items-center py-12">
        <Pagination
          count={count}
          size="large"
          page={page}
          variant="outlined"
          color="primary"
          onChange={handleChange}
        />
      </Stack>
    </Container>
  );
};
export default Home;
