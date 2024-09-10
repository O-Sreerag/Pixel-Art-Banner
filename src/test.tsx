import { useEffect, useState } from 'react'

export default function Component() {
    const [pixels, setPixels] = useState<string[][]>([])
    // number of pixels in row and column, 80:240 gives 1:4 ratio
    const rows = 60
    const cols = 240


    useEffect(() => {
        const newPixels = Array(rows).fill(null).map(() => Array(cols).fill('transparent'))

        // Add texts to display, adjust their position ( row, col) and their colors
        addText(newPixels, 'SREERAG O', 30, cols - 65, '#FF6B6B')
        addText(newPixels, 'SOFTWARE ENGINEER', 40, cols - 110, '#FF69B4')

        // Add subtle background pattern
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                // Adjusted probability, density of background pixels
                if (newPixels[i][j] === 'transparent' && Math.random() > 0.96) {
                    newPixels[i][j] = getBackgroundColor(i, j)
                }
            }
        }

        setPixels(newPixels)
    }, [])

    function getBackgroundColor(i: number, j: number) {
        // set colors for bg pixels
        const colors = ['#FFA500', '#00BFFF', '#32CD32', '#FFFF00', '#FF69B4', '#9370DB'];
        return colors[Math.floor((i * cols + j) / 16) % colors.length]
    }

    function addText(pixelArray: string[][], text: string, startRow: number, startCol: number, color: string) {
        const letters: { [key: string]: number[][] } = {
            'A': [[0, 1], [1, 0], [1, 2], [2, 0], [2, 1], [2, 2], [3, 0], [3, 2], [4, 0], [4, 2]],
            'B': [[0, 0], [0, 1], [1, 0], [1, 2], [2, 0], [2, 1], [3, 0], [3, 2], [4, 0], [4, 1]],
            'C': [[0, 1], [0, 2], [1, 0], [2, 0], [3, 0], [4, 1], [4, 2]],
            'D': [[0, 0], [0, 1], [1, 0], [1, 2], [2, 0], [2, 2], [3, 0], [3, 2], [4, 0], [4, 1]],
            'E': [[0, 0], [0, 1], [0, 2], [1, 0], [2, 0], [2, 1], [3, 0], [4, 0], [4, 1], [4, 2]],
            'F': [[0, 0], [0, 1], [0, 2], [1, 0], [2, 0], [2, 1], [3, 0], [4, 0]],
            'G': [[0, 1], [0, 2], [1, 0], [2, 0], [3, 0], [3, 2], [4, 1], [4, 2]],
            'H': [[0, 0], [0, 2], [1, 0], [1, 2], [2, 0], [2, 1], [2, 2], [3, 0], [3, 2], [4, 0], [4, 2]],
            'I': [[0, 0], [0, 1], [0, 2], [1, 1], [2, 1], [3, 1], [4, 0], [4, 1], [4, 2]],
            'J': [[0, 2], [1, 2], [2, 2], [3, 0], [3, 2], [4, 1]],
            'K': [[0, 0], [0, 2], [1, 0], [1, 1], [2, 0], [2, 1], [3, 0], [3, 2], [4, 0], [4, 2]],
            'L': [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [4, 1], [4, 2]],
            'M': [[0, 0], [0, 4], [1, 0], [1, 1], [1, 3], [1, 4], [2, 0], [2, 2], [2, 4], [3, 0], [3, 4], [4, 0], [4, 4]],
            'N': [[0, 0], [0, 3], [1, 0], [1, 1], [1, 3], [2, 0], [2, 2], [2, 3], [3, 0], [3, 3], [4, 0], [4, 3]],
            'O': [[0, 1], [1, 0], [1, 2], [2, 0], [2, 2], [3, 0], [3, 2], [4, 1]],
            'P': [[0, 0], [0, 1], [1, 0], [1, 2], [2, 0], [2, 1], [3, 0], [4, 0]],
            'Q': [[0, 1], [1, 0], [1, 2], [2, 0], [2, 2], [3, 0], [3, 2], [4, 1], [4, 2]],
            'R': [[0, 0], [0, 1], [1, 0], [1, 2], [2, 0], [2, 1], [3, 0], [3, 2], [4, 0], [4, 2]],
            'S': [[0, 1], [0, 2], [1, 0], [2, 1], [3, 2], [4, 0], [4, 1]],
            'T': [[0, 0], [0, 1], [0, 2], [1, 1], [2, 1], [3, 1], [4, 1]],
            'U': [[0, 0], [0, 2], [1, 0], [1, 2], [2, 0], [2, 2], [3, 0], [3, 2], [4, 1]],
            'V': [[0, 0], [0, 2], [1, 0], [1, 2], [2, 0], [2, 2], [3, 1], [3, 2], [4, 1]],
            'W': [[0, 0], [0, 4], [1, 0], [1, 4], [2, 0], [2, 2], [2, 4], [3, 0], [3, 1], [3, 3], [3, 4], [4, 0], [4, 4]],
            'X': [[0, 0], [0, 2], [1, 0], [1, 2], [2, 1], [3, 0], [3, 2], [4, 0], [4, 2]],
            'Y': [[0, 0], [0, 2], [1, 0], [1, 2], [2, 1], [3, 1], [4, 1]],
            'Z': [[0, 0], [0, 1], [0, 2], [1, 2], [2, 1], [3, 0], [4, 0], [4, 1], [4, 2]],
            ' ': []
        }

        let col = startCol
        for (let char of text) {
            if (letters[char]) {
                for (let [y, x] of letters[char]) {
                    if (startRow + y < rows && col + x < cols) {
                        pixelArray[startRow + y][col + x] = color
                    }
                }
                // letter spacing
                col += 6
            } else {
                // spacing
                col += 3
            }
        }
    }

    return (
        <div className="w-full h-[396px] bg-fuchsia-950 relative overflow-hidden">
            <div className="absolute inset-0 grid" style={{ gridTemplateRows: `repeat(${rows}, 1fr)`, gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
                {pixels.map((row, i) =>
                    row.map((color, j) => (
                        <div
                            key={`${i}-${j}`}
                            className="w-full h-full"
                            style={{ backgroundColor: color }}
                        />
                    ))
                )}
            </div>
        </div>
    )
}