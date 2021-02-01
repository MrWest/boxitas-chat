const okAndLog = (actionName, okStatus, data) => {
    console.log(`${actionName} Action - Exiting`);
    return { result: 'ok', status: okStatus, data };
  };
  
  const errorAndLog = (actionName, errorStatus, data) => {
    console.log(`${actionName} Action - error: ${errorStatus}, data:`, data);
    return { result: 'error', status: errorStatus, data };
  };

  export { okAndLog, errorAndLog };