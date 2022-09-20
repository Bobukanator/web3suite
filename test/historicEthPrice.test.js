import {getEthPriceByDate,loadCSVData,saveJSONtoFile} from "../utils/historicEthPrice"
import HISTORICJSONDATA from "../static/HistoricalDataETHPRICE.json"

test('test getEthPriceByDate', async () => {

  const historicdata = await loadCSVData('static/HistoricalDataETHPRICE.csv')
  expect( getEthPriceByDate(historicdata,"8/19/2022")).toBe("1625.17")
  expect( getEthPriceByDate(historicdata,"6/21/2022")).toBe("1088.17")
  expect( getEthPriceByDate(historicdata,"6/21/1980")).toBe("No price data for that date!")
  //saveJSONtoFile('static/HistoricalDataETHPRICE.json',historicdata) //ONLY USE THIS WHEN UPDATED HISTORIC JSON DATA
})

test('test getEthPriceByDataWJSONloadedfromimport', () => {

  expect( getEthPriceByDate(HISTORICJSONDATA,"8/19/2022")).toBe("1625.17")
  expect( getEthPriceByDate(HISTORICJSONDATA,"6/21/2022")).toBe("1088.17")
  expect( getEthPriceByDate(HISTORICJSONDATA,"6/21/1980")).toBe("No price data for that date!")
})

