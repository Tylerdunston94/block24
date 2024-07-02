// List of candidate words
const candidates = ["apple", "apricot", "banana", "cherry", "date"];

// Function to check if a candidate string is relevant based on common prefix
function isRelevant(inputStr, candidateStr, prefixLength = 2) {
    return inputStr.substring(0, prefixLength) === candidateStr.substring(0, prefixLength);
}

// Function to filter the list of candidates to only those that are relevant
function filterRelevant(inputStr, candidates, relevanceFn) {
    return candidates.filter(candidate => relevanceFn(inputStr, candidate));
}

// Function to calculate the Levenshtein distance between two strings
function levenshteinDistance(s1, s2) {
    const len1 = s1.length;
    const len2 = s2.length;
    const dp = Array.from({ length: len1 + 1 }, () => Array(len2 + 1).fill(0));

    for (let i = 0; i <= len1; i++) {
        for (let j = 0; j <= len2; j++) {
            if (i === 0) dp[i][j] = j; // If first string is empty
            else if (j === 0) dp[i][j] = i; // If second string is empty
            else {
                const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;
                dp[i][j] = Math.min(
                    dp[i - 1][j] + 1, // Deletion
                    dp[i][j - 1] + 1, // Insertion
                    dp[i - 1][j - 1] + cost // Substitution
                );
            }
        }
    }

    return dp[len1][len2];
}

// Function to find the closest candidate based on the distance function
function findClosest(inputStr, candidates, distanceFn) {
    return candidates.reduce((closest, candidate) => {
        const distance = distanceFn(inputStr, candidate);
        return distance < closest.distance ? { candidate, distance } : closest;
    }, { candidate: null, distance: Infinity }).candidate;
}

// Main autocorrect function
function autocorrect() {
    const inputStr = document.getElementById("inputString").value; // Get input string
    const relevantCandidates = filterRelevant(inputStr, candidates, isRelevant); // Filter relevant candidates
    if (relevantCandidates.length === 0) {
        document.getElementById("result").innerText = "No relevant candidates found."; // If no relevant candidates
        return;
    }
    const correctedStr = findClosest(inputStr, relevantCandidates, levenshteinDistance); // Find closest candidate
    document.getElementById("result").innerText = `Did you mean: ${correctedStr}?`; // Display result
}
