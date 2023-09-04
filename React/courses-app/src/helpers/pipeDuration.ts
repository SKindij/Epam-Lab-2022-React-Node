export const pipeDuration = (duration:number): string => {
    const hours = Math.floor(duration / 60);
    return hours + ':' + (duration - hours * 60);
  };
  
