const checkFunctions = {
    'BT-1': (value) => typeof value === 'string' && value.length > 0,
    'BT-2': (value) => typeof value === 'number' && value > 0,
    'BT-3': (value) => Boolean(value) && /^[A-Z0-9]+$/.test(value)
    // Add more check functions as needed
  };