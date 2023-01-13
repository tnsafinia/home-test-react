import React, { useState, useEffect, useCallback } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

export default function SimilarPage(products) {
  const [similarity, setSimilarity] = useState("");
  const [movieX, setMovieX] = useState("");
  const [movieY, setMovieY] = useState("");

  const [allValuesX, setAllValuesX] = useState({
    imdbRatingX: "",
    parentalRatingX: "",
    productionYearX: "",
    actorsX: [],
    durationX: 0,
  });
  const [allValuesY, setAllValuesY] = useState({
    imdbRatingY: "",
    parentalRatingY: "",
    productionYearY: "",
    actorsY: [],
    durationY: 0,
  });

  const productsInfo = products.products;

  const handleOnClick = (e, i) => {
    if (movieY === "" || movieX === "") {
      e.currentTarget.style.backgroundColor = "salmon";

      if (movieX === "" && movieY !== "") {
        setMovieX(i.title);
        setAllValuesX({
          imdbRatingX: i.imdb.rating,
          parentalRatingX: i.parentalRating,
          productionYearX: i.production.year,
          actorsX: i.people.actors,
          durationX: i.duration.milliseconds,
        });
      } else if (movieY === "" && movieX !== "") {
        setMovieY(i.title);
        setAllValuesY({
          imdbRatingY: i.imdb.rating,
          parentalRatingY: i.parentalRating,
          productionYearY: i.production.year,
          actorsY: i.people.actors,
          durationY: i.duration.milliseconds,
        });
      } else if (movieY === "" && movieX === "") {
        setMovieX(i.title);
        setAllValuesX({
          imdbRatingX: i.imdb.rating,
          parentalRatingX: i.parentalRating,
          productionYearX: i.production.year,
          actorsX: i.people.actors,
          durationX: i.duration.milliseconds,
        });
      }
    }

    e.currentTarget.style.backgroundColor = "salmon";
    console.log(i);
  };

  const paperElement = document.getElementsByClassName("paperElement");

  const resetButton = () => {
    setMovieX("");
    setMovieY("");
    for (const element of paperElement) {
      element.style.backgroundColor = "white";
    }
  };

  const calculateSimilarity = useCallback(() => {
    let nr = 0;

    if (
      Math.round(allValuesX.imdbRatingX) === Math.round(allValuesY.imdbRatingY)
    ) {
      nr++;
    }
    if (allValuesX.parentalRatingX === allValuesY.parentalRatingY) {
      nr++;
    }
    if (allValuesX.productionYearX === allValuesY.productionYearY) {
      nr++;
    }

    function findCommonActor(array1, array2) {
      for (let i = 0; i < array1?.length; i++) {
        for (let j = 0; j < array2?.length; j++) {
          if (array1[i] === array2[j]) {
            return true;
          }
        }
      }
      return false;
    }

    findCommonActor(allValuesX.actorsX, allValuesY.actorsY);

    if (findCommonActor(allValuesX.actorsX, allValuesY.actorsY) === true) {
      nr++;
    }

    const hourX = Math.floor(allValuesX.durationX / 1000 / 60 / 60);
    const hourY = Math.floor(allValuesY.durationY / 1000 / 60 / 60);

    if (hourX < 1 && hourY > 1) {
      nr++;
    }
    if ((1 < hourX < 2 && 1 < hourY < 2) || (hourX === 1 && hourY === 1)) {
      nr++;
    }
    if ((hourX > 2 && hourY > 2) || (hourX === 2 && hourY === 2)) {
      nr++;
    }

    if (nr >= 3) {
      setSimilarity("Yes");
    } else {
      setSimilarity("No");
    }
  }, [allValuesX, allValuesY]);

  useEffect(() => {
    calculateSimilarity();
  }, [calculateSimilarity]);

  return (
    <div>
      <h1>Are these similar?</h1>
      {movieX === "" && movieY === "" ? (
        <h4 style={{ paddingTop: "5%" }}>
          Select two movies below to see their similarities
        </h4>
      ) : (
        <>
          <Box style={{ padding: "5%" }}>
            <Grid container rowSpacing={2} columnSpacing={2}>
              <Grid item xs={4} sx={{ backgroundColor: "green" }}>
                {movieX}
              </Grid>
              <Grid item xs={4}>
                {movieX !== "" && movieY !== "" && movieX !== movieY ? (
                  <div>
                    <h1>{similarity}</h1>
                    <button onClick={resetButton}>Clear selection</button>
                    <p>
                      year: {allValuesX.productionYearX} -{" "}
                      {allValuesY.productionYearY}
                    </p>
                    <p>
                      parental rating:
                      {allValuesX.parentalRatingX} -{" "}
                      {allValuesY.parentalRatingY}
                    </p>

                    <p>
                      imdb rating: {allValuesX.imdbRatingX} -{" "}
                      {allValuesY.imdbRatingY}
                    </p>
                    <p>
                      actors:
                      {<br />}
                      {<br />}
                      {allValuesX.actorsX}
                      {<br />}
                      {<br />}
                      {allValuesY.actorsY}
                    </p>
                    <p>
                      duration: {allValuesX.durationX} - {allValuesY.durationY}
                    </p>
                  </div>
                ) : (
                  <div>
                    <p>You need to select two different movies to compare</p>
                    <button onClick={resetButton}>Reset button</button>
                  </div>
                )}
              </Grid>
              <Grid item xs={4} sx={{ backgroundColor: "green" }}>
                {movieY}
              </Grid>
            </Grid>
          </Box>
        </>
      )}

      <Box style={{ padding: "5%" }}>
        <Grid container rowSpacing={2} columnSpacing={2}>
          {productsInfo.map((product, i) => (
            <Grid item xs={3} key={i}>
              <Paper
                key={i}
                onClick={(e) => handleOnClick(e, product)}
                style={{ backgroundColor: "white" }}
                className="paperElement"
              >
                {product.title}
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}
