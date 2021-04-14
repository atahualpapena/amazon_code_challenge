function applicationPairs(
  deviceCapacity,
  foregroundAppList,
  backgroundAppList
) {
  let optimalCapacity = 0;
  let optimalPairs = [];

  if (foregroundAppList.length < 2) return optimalPairs;
  // Extract first foreground app from list
  const foregroundApp = foregroundAppList[0];

  // Generate a new list without first item
  const newForegroundAppList = foregroundAppList.slice(1);

  // App combinations
  for (let backgroundApp of backgroundAppList) {
    const pairCapacity = backgroundApp[1] + foregroundApp[1];

    if (pairCapacity <= deviceCapacity) {
      const appPair = [foregroundApp[0], backgroundAppList[0]];
      if (pairCapacity == optimalCapacity) {
        optimalPairs.push(appPair);
      } else if (pairCapacity > optimalCapacity) {
        optimalPairs = [appPair];
        optimalCapacity = pairCapacity;
      }
    }
  }

  return applicationPairs(
    deviceCapacity,
    newForegroundAppList,
    backgroundAppList
  );
}