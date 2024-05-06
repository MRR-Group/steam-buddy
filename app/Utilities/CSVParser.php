<?php

namespace App\Utilities;

use App\Exceptions\CSVParsingException;

class CSVParser {
    /** @return array<mixed> */
    public function parse(string $data): array {
        $lines = $this->split_to_lines($data);
        $this->skip_csv_header($lines);

        return array_map(fn($line) => $this->parse_line($line), $lines);
    }

    /** @return string[] */
    protected function split_to_lines(string $data): array {
        $new_line_win_unix = '/$\R?^/m';

        return preg_split($new_line_win_unix, $data);
    }

    protected function skip_csv_header(array &$lines): void {
        if ($this->is_csv_header($lines[0])) {
            array_shift($lines);
        }
    }

    protected function is_csv_header(string $line): bool {
        return str_getcsv($line)[0] == "#";
    }

    /** @return array<mixed> */
    protected function parse_line(string $line): array {
        $result = str_getcsv($line);

        if (!$this->is_line_valid($result)) {
            throw new CSVParsingException($line);
        }

        return $result;
    }

    protected function is_line_valid(array $line): bool {
        return count($line) > 0 && !is_null($line[0]);
    }
}