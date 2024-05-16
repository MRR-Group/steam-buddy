<?php

declare(strict_types=1);

namespace App\Console\Commands;

use App\Exceptions\CSVParsingException;
use App\Models\Tag;
use App\Utilities\CSVParser;
use App\Utilities\InputStream;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class ImportTags extends Command
{
    protected $signature = "app:import-tags";
    protected $description = "Import tags from an I/O stream containing csv data";

    public function handle(InputStream $stream, CSVParser $csv_parser): int
    {
        $all = 0;
        $created = 0;

        /** @var array<array> $csv */
        $csv = null;

        try {
            $csv = $csv_parser->parse($stream->get());
        } catch (CSVParsingException $exception) {
            $this->display_error_message($exception->getMessage());

            return 1;
        }

        $tags = $this->create_tags($csv);
        $all = count($tags);

        $tags = $this->skip_existing_tags($tags);
        $created = count($tags);

        DB::table("tags")->insert($tags);
        $this->info("skipped: " . ($all - $created) . ", imported: " . $created);

        return 0;
    }

    protected function create_tags(array $csv): array
    {
        return array_map(fn($line) => $this->create_tag_constructor($line), $csv);
    }

    protected function create_tag_constructor(array $line): array
    {
        $name = strval($line[1]);
        $now = Carbon::now();

        return ["name" => $name, "created_at" => $now, "updated_at" => $now];
    }

    protected function skip_existing_tags(array $tags): array
    {
        return array_filter($tags, fn($tag) => $this->is_tag_new($tag));
    }

    protected function is_tag_new(array $tag): bool
    {
        return !Tag::exist($tag["name"]);
    }

    private function display_error_message(string $error): void
    {
        $this->newLine();
        $this->line("<error>ERROR:</error> " . $error);
        $this->newLine();
    }
}
