package com.cydeo;


import org.junit.Assert;
import org.junit.Test;
import org.openqa.selenium.Alert;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class WeatherAppTests {
    @Test
    public void TestLocations() {
        WebDriver driver = new ChromeDriver();
        try {
            driver.get("file:///C:/Users/sulai/Desktop/Weather-Forecast-App-main/Weather-Forecast-App-main/index.html");
            WebElement searchInput = driver.findElement(By.id("query"));
            WebElement searchButton = driver.findElement(By.cssSelector("button"));
            searchInput.sendKeys("New York");
            Thread.sleep(1000);
            searchButton.click();
            Thread.sleep(1000); // Wait for data to load
            WebElement locationElement = driver.findElement(By.id("location"));
            Thread.sleep(1000); // Wait for data to load
            Assert.assertTrue(locationElement.getText().contains("New York"));

        } catch (InterruptedException e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }

    @Test
    public void testTemperatureUnitSwitch() throws InterruptedException {
        WebDriver driver = new ChromeDriver();
        try {
            driver.get("file:///C:/Users/sulai/Desktop/Weather-Forecast-App-main/Weather-Forecast-App-main/index.html");
            WebElement fahrenheitButton = driver.findElement(By.cssSelector(".fahrenheit"));
            fahrenheitButton.click();
            WebElement tempUnit = driver.findElement(By.cssSelector(".temp-unit"));
            Assert.assertEquals("°F", tempUnit.getText());
            Thread.sleep(4000);
        } finally {
            driver.quit();
        }
    }


    @Test
    public void testChangeForecastSpanTo15Days() throws InterruptedException {
        WebDriver driver = new ChromeDriver();
        try {
            driver.get("file:///C:/Users/sulai/Desktop/Weather-Forecast-App-main/Weather-Forecast-App-main/index.html");
            WebElement weekButton = driver.findElement(By.cssSelector("body > div > div.main > nav > ul:nth-child(1) > button.month"));
            weekButton.click();
            WebElement activeButton = driver.findElement(By.cssSelector("body > div > div.main > nav > ul:nth-child(1) > button.month"));
            Assert.assertNotNull(activeButton);
            Thread.sleep(4000);
        } finally {
            driver.quit();
        }}

    @Test

    public void testDetailedWeatherInfo() throws InterruptedException {
        WebDriver driver = new ChromeDriver();
        try {
            driver.get("file:///C:/Users/sulai/Desktop/Weather-Forecast-App-main/Weather-Forecast-App-main/index.html");
            WebElement weekButton = driver.findElement(By.cssSelector(".week"));
            weekButton.click();
            Thread.sleep(6000); // Wait for data to load
            WebElement firstDayCard = driver.findElement(By.xpath("//div[@id='weather-cards']/div[1]")); // Assuming the first card is for the first day of the week
            firstDayCard.click();
            Assert.assertFalse(driver.findElement(By.cssSelector(".wind-speed")).getText().isEmpty());
            Assert.assertFalse(driver.findElement(By.cssSelector(".humidity")).getText().isEmpty());
            Assert.assertFalse(driver.findElement(By.cssSelector(".visibility")).getText().isEmpty());
        } catch (InterruptedException e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }




    @Test
    public void testAutoDataRefresh() {
//        This test ensures that the weather data is automatically refreshed
//        at regular intervals without user interaction and that the data updates correctly.
        WebDriver driver = new ChromeDriver();
        try {
            driver.get("file:///C:/Users/sulai/Desktop/Weather-Forecast-App-main/Weather-Forecast-App-main/index.html");
            String initialTemp = driver.findElement(By.id("temp")).getText();
            Thread.sleep(10000); // Assuming data refreshes every 10 seconds
            String refreshedTemp = driver.findElement(By.id("temp")).getText();
            Assert.assertNotEquals(initialTemp, refreshedTemp);
        } catch (InterruptedException e) {
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }

    @Test
    public void testSearchFunctionality() throws InterruptedException {
//        This test checks if the search function can
//        update the location display appropriately.
        WebDriver driver = new ChromeDriver();

        driver.get("file:///C:/Users/sulai/Desktop/Weather-Forecast-App-main/Weather-Forecast-App-main/index.html");
        WebElement searchInput = driver.findElement(By.id("query"));
        WebElement searchButton = driver.findElement(By.cssSelector("#search > button"));

        searchInput.sendKeys("london");

        Thread.sleep(3000);
        searchButton.click();
        Thread.sleep(3000);

        WebElement locationElement = driver.findElement(By.cssSelector("#location"));
        System.out.println("locationElement.getText() = " + locationElement.getText());
        Assert.assertTrue(locationElement.getText().toLowerCase().contains("london"));
        driver.quit();


    }
}



