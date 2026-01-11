// AI-Powered Smart Recommendations
export const getClubRecommendations = (user, allClubs) => {
  const userInterests = user.clubs || [];
  const userRole = user.role || 'student';
  
  // Simple collaborative filtering algorithm
  const recommendations = allClubs
    .filter(club => !userInterests.includes(club.id))
    .map(club => {
      let score = 0;
      
      // Category matching
      const userCategories = userInterests.map(id => 
        allClubs.find(c => c.id === id)?.category
      ).filter(Boolean);
      
      if (userCategories.includes(club.category)) {
        score += 30;
      }
      
      // Popularity boost
      score += Math.min(club.members || 0, 50);
      
      // Role-based recommendations
      if (userRole === 'president' && club.category === 'Leadership') {
        score += 20;
      }
      
      return { ...club, recommendationScore: score };
    })
    .sort((a, b) => b.recommendationScore - a.recommendationScore)
    .slice(0, 6);
  
  return recommendations;
};

export const getSimilarUsers = (currentUser, allUsers) => {
  return allUsers
    .filter(user => user.id !== currentUser.id)
    .map(user => {
      const commonClubs = (user.clubs || []).filter(clubId => 
        (currentUser.clubs || []).includes(clubId)
      ).length;
      
      return { ...user, similarity: commonClubs };
    })
    .filter(user => user.similarity > 0)
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, 5);
};

export const getSmartEventSuggestions = (user, allEvents) => {
  const userClubs = user.clubs || [];
  
  return allEvents
    .filter(event => userClubs.includes(event.clubId))
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 5);
};
