// List of candidate words to choose from
const candidates = ["apple", "apricot", "banana", "cherry", "date"];

// Function to check if a candidate string is relevant based on common prefix
function isRelevant(inputStr, candidateStr, prefixLength = 2) {
    // Compare the beginning of the input string with the candidate string
    // Return true if they have the same prefix of length
    return inputStr.substring(0, prefixLength) === candidateStr.substring(0, prefixLength);
}

// Function to filter the list of candidates to only those that are relevant
function filterRelevant(inputStr, candidates, relevanceFn) {
    //Filter the candidates array using the relevance function
    // Return an array of candidates that are considered relevant based on the input string
    return candidates.filter(candidate => relevanceFn(inputStr, candidate));
}

// Function to calculate the Levenshtein distance between two strings
function levenshteinDistance(s1, s2) {
    // Get the lengths of both strings
    const len1 = s1.length;
    const len2 = s2.length;
    // Create a 2D array for  programming
    const dp = Array.from({ length: len1 + 1 }, () => Array(len2 + 1).fill(0));

    // Fill the first row and column of the array
    for (let i = 0; i <= len1; i++) {
        for (let j = 0; j <= len2; j++) {
            if (i === 0) dp[i][j] = j; // Cost of deletion
            else if (j === 0) dp[i][j] = i; // Cost of insertion
            else {
                // Calculate cost (0 if characters are the same, 1 if not)
                const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;
                // Fill dp array with minimum cost of operations (deletion, insertion, substitution)
                dp[i][j] = Math.min(
                    dp[i - 1][j] + 1, // Deletion
                    dp[i][j - 1] + 1, // Insertion
                    dp[i - 1][j - 1] + cost // Substitution
                );
            }
        }
    }
    
    // Return the Levenshtein distance which is the cost to transform s1 into s2
    return dp[len1][len2];
}

// Function to find the closest candidate base on the distance function
function findClosest(inputStr, candidates, distanceFn) {
    // Iterate through candidates to find the one with the smallest distance
    return candidates.reduce((closest, candidate) => {
        const distance = distanceFn(inputStr, candidate); // Calculate distance to candidate
        // Update closest if the current candidate has a smaller distance
        return distance < closest.distance ? { candidate, distance } : closest;
    }, { candidate: null, distance: Infinity }).candidate; // Start with no candidate and infinite distance
}

// Main autocorrect function
function autocorrect() {
    // Get the input string from the input field
    const inputStr = document.getElementById("inputString").value; 
    // Filter relevant candidates based on the input string
    const relevantCandidates = filterRelevant(inputStr, candidates, isRelevant); 
    // Check if any relevant candidates were found
    if (relevantCandidates.length === 0) {
        // If none found, display a message to the user
        document.getElementById("result").innerText = "No relevant candidates found."; 
        return; // Exit the function early
    }
    // Find the closest match from the relevant candidates
    const correctedStr = findClosest(inputStr, relevantCandidates, levenshteinDistance); 
    // Display the closest match to the user
    document.getElementById("result").innerText = `Did you mean: ${correctedStr}?`; 
}
