CREATE TABLE citybiketrips (
  dept_time VARCHAR(255),
  return_time VARCHAR(255),
  dept_station_id INT,
  dept_station VARCHAR(255),
  return_station_id INT,
  return_station VARCHAR(255),
  distance FLOAT(10),
  duration FLOAT(10)
);

CREATE TABLE bikestations (
  FID SERIAL PRIMARY KEY,
  station_id INT NOT NULL,
  station_nameFI VARCHAR(255) NOT NULL,
  station_nameSE VARCHAR(255),
  station_nameEN VARCHAR(255),
  osoite VARCHAR(255),
  adress VARCHAR(255),
  kaupunki VARCHAR(255),
  stad VARCHAR(255),
  operaattori VARCHAR(255),
  kapasiteetti VARCHAR(255),
  x_koord FLOAT(8),
  y_koord FLOAT(8)
)