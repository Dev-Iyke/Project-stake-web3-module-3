async function activityTable(day) {
  // Read the list of log file names
  let logFileList = await textFile("camera_logs.txt");
  let fileNames = logFileList.trim().split("\n");

  // Create an array of 24 zeros to count triggers per hour
  let table = new Array(24).fill(0);

  // Loop through each log file
  for (let fileName of fileNames) {
    // Read the contents of the file
    let fileContent = await textFile(fileName);
    let timestamps = fileContent.trim().split("\n");

    for (let ts of timestamps) {
      // Convert the timestamp to a number
      let time = new Date(Number(ts));
      
      // Check if it happened on the day we care about
      if (time.getDay() === day) {
        let hour = time.getHours(); // Get the hour (0–23)
        table[hour]++; // Count this trigger
      }
    }
  }

  return table;
}

// Example usage
activityTable(1)
  .then(table => console.log(activityGraph(table)));
